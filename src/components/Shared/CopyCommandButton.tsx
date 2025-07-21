import {Button} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

// The component takes the command to copy as a prop
export const CopyCommandButton = ({command}: { command: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy command:", err);
        }
    };

    return (
        <div className="mt-12 flex justify-center">
            <Button
                className="bg-zinc-50 border-zinc-400 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 font-mono text-sm transition-all"
                radius="md"
                onPress={handleCopy}
                variant="bordered"
                // Make the button slightly wider when showing "Copied!" to prevent layout shift
                style={{minWidth: "240px"}}
            >
                {isCopied ? (
                    // Feedback state with a checkmark icon
                    <span className="flex items-center gap-2 text-emerald-400">
            <Icon className="h-5 w-5" icon="heroicons:check-circle"/>
            Copied to clipboard!
          </span>
                ) : (
                    // Default state
                    <>
                        <span className="mr-2 text-lime-400">$</span>
                        {command}
                    </>
                )}
            </Button>
        </div>
    );
};