"use client";

import { AdminGetLessonType } from "@/app/data/admin/admin-get-lesson";
import { FileUpload } from "@/components/fil-uploader/Uploader";
import { RichTextEditor } from "@/components/rich-text-editor/rich-text-editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tryCatch } from "@/lib/try-catch";
import { lessonSchema, lessonSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileText, Loader2, Video } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateLesson } from "../actions";
import { toast } from "sonner";

interface iAppProps {
  data: AdminGetLessonType;
  chapterId: string;
  courseId: string;
}

export default function LessonForm({ data, chapterId, courseId }: iAppProps) {
  const [pending, startTransition] = useTransition();

  const form = useForm<lessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: data.title,
      description: data.description ?? undefined,
      thumbnailKey: data.thumbnailKey ?? undefined,
      videoKey: data.videoKey ?? undefined,
      pdfKey: data.pdfKey ?? undefined, // ✅ Add PDF default value
      chapterId: chapterId,
      courseId: courseId,
    },
  });

  // Watch to determine which resource is selected
  const videoKey = form.watch("videoKey");
  const pdfKey = form.watch("pdfKey");
  const hasVideo = !!videoKey;
  const hasPDF = !!pdfKey;
  const resourceType = hasVideo ? "video" : hasPDF ? "pdf" : "none";

  function onSubmit(values: lessonSchemaType) {
    startTransition(async () => {
      // Call server action
      const { data: result, error } = await tryCatch(
        updateLesson({ data: values, lessonId: data.id }),
      );

      if (error) {
        toast.error("An Unexpected error occurred");
        return;
      }

      // Handle result
      if (result?.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result?.message || "Failed to update lesson");
      }
    });
  }

  return (
    <div>
      <Link
        href={`/admin/courses/${courseId}/edit`}
        className={buttonVariants({ variant: "outline", className: "mb-6" })}
      >
        <ArrowLeft className="size-4" />
        <span>Go Back</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
          <CardDescription>
            Configure the content and resources for this lesson.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Lesson Name */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Lesson name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="write lesson description here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail Image */}
              <FormField
                control={form.control}
                name="thumbnailKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                        fileType="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resource Type Selector */}
              <div className="space-y-4">
                <FormLabel>Lesson Resource</FormLabel>
                <Tabs value={resourceType} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="none" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      None
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="pdf" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      PDF Document
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="none" className="mt-4">
                    <div className="text-center py-8 text-muted-foreground border rounded-lg">
                      No resource selected for this lesson
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="mt-4">
                    <FormField
                      control={form.control}
                      name="videoKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video File</FormLabel>
                          <FormControl>
                            <FileUpload
                              value={field.value}
                              onChange={field.onChange}
                              fileType="video"
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground">
                            Upload MP4, WebM, or MOV files (max 100MB)
                          </p>
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="pdf" className="mt-4">
                    <FormField
                      control={form.control}
                      name="pdfKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PDF Document</FormLabel>
                          <FormControl>
                            <FileUpload
                              value={field.value}
                              onChange={field.onChange}
                              fileType="pdf"
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground">
                            Upload PDF files for reading materials, worksheets, or resources (max 10MB)
                          </p>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <Button type="submit" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>Save Lesson</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}