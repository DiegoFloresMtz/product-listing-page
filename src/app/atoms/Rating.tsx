import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

interface RatingProps {
    rating: number;
    size?: "sm" | "md" | "lg";
}

export const Rating = ({ rating, size = "md" }: RatingProps) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    const renderStar = (index: number) => {
        const starValue = index + 1;
        const difference = starValue - rating;

        if (difference <= 0) {
            // Full star
            return <StarIcon key={index} className={`${sizeClasses[size]} text-yellow-400`} />;
        } else if (difference > 0 && difference < 1) {
            // Partial star
            const percentage = (1 - difference) * 100;
            return (
                <div key={index} className="relative">
                    <StarIconOutline className={`${sizeClasses[size]} text-gray-300`} />
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
                        <StarIcon className={`${sizeClasses[size]} text-yellow-400`} />
                    </div>
                </div>
            );
        } else {
            // Empty star
            return <StarIconOutline key={index} className={`${sizeClasses[size]} text-gray-300`} />;
        }
    };

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => renderStar(index))}
            <span className="ml-1 text-sm text-gray-500">({rating.toFixed(1)})</span>
        </div>
    );
}; 