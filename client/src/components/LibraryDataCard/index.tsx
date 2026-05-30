import { ReactNode } from "react";
import { Card, CardContent} from "@/components/ui/card"


interface LibraryDataCardProps {
    title: string,
    data: string | number;
    icon: ReactNode;
    variant?: "default" | "alert" | "active"
}

export default function LibraryDataCard({
    title,
    data,
    icon,
    variant = "default",
}: LibraryDataCardProps) {

    const iconStyles = {
        default: "bg-secondary-blue text-white",
        alert:   "bg-red-100 text-red-600",
        active: "bg-emerald-500 text-white",
    }

    return(
        <Card>
            <CardContent className="flex items-center gap-4 p-5">
                <div className={`rounded-lg p-3 ${iconStyles[variant]}`}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">{title}</span>
                    <span className="text-2x1 font-bold text-gray-800">{data}</span>
                </div>
            </CardContent>
        </Card>
    );
}


