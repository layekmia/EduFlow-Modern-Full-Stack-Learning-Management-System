import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking on 'Forgot Password' on the login page. We'll send you a reset link to your email address.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied, contact our support team within 30 days of purchase.",
  },
  {
    question: "How long do I have access to a course?",
    answer:
      "Once you enroll in a course, you have lifetime access. You can learn at your own pace and revisit the material anytime.",
  },
  {
    question: "Do you offer certificates?",
    answer:
      "Yes! Upon successful completion of a course, you'll receive a verified certificate that you can share on LinkedIn or add to your resume.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely.",
  },
  {
    question: "Can I access courses on mobile?",
    answer:
      "Yes, our platform is fully responsive and works on all devices. You can learn on your desktop, tablet, or smartphone.",
  },
];

export default function FAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
