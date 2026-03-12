
import { ActivityType } from "@/app/data/user/get-recent-activity";

export function formatActivityForDisplay(activity: ActivityType) {
    const now = new Date();
    const diffMs = now.getTime() - activity.timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let timeAgo: string;
    if (diffMins < 1) {
        timeAgo = "Just now";
    } else if (diffMins < 60) {
        timeAgo = `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
        timeAgo = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
        timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else {
        timeAgo = activity.timestamp.toLocaleDateString();
    }

    return {
        ...activity,
        timeAgo,
        description:
            activity.type === "completed"
                ? `Completed "${activity.lessonTitle}"`
                : activity.type === "started"
                    ? `Started "${activity.lessonTitle}"`
                    : activity.type === "enrolled"
                        ? `Enrolled in "${activity.courseTitle}"`
                        : "",
    };
}