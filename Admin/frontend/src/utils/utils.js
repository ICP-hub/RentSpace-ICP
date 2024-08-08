export function calculateDate(date) {
    const today = new Date();
    const reportDate = new Date(date);

    const diffTime = Math.abs(today - reportDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    switch (diffDays) {
        case 0 || NaN:
            return "Today";
        case 1:
            return "Yesterday";
        default:
            if (diffDays < 7) {
                return `${diffDays} days ago`;
            } else if (diffDays < 30) {
                const weeks = Math.floor(diffDays / 7);
                return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
            } else if (diffDays < 365) {
                const months = Math.floor(diffDays / 30);
                return `${months} month${months > 1 ? "s" : ""} ago`;
            } else {
                const years = Math.floor(diffDays / 365);
                return `${years} year${years > 1 ? "s" : ""} ago`;
            }

    }

}