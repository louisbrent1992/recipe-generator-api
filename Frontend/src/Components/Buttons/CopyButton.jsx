import React from "react";

function CopyButton({ recipeContainerRef }) {
	const handleCopyRecipe = () => {
		if (recipeContainerRef.current) {
			const recipeText = recipeContainerRef.current.innerText;

			try {
				// Copy the inner text of the recipe container to the clipboard
				navigator.clipboard.writeText(recipeText).then(() => {
					console.log("Recipe copied to clipboard:", recipeText);
				});
			} catch (error) {
				// Handle any potential errors
				console.error("Error copying recipe:", error);
			}
		} else {
			// Handle the case where the recipe container reference is not available
			console.error("Recipe container reference not available.");
		}
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
			style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
			onClick={handleCopyRecipe}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
			/>
		</svg>
	);
}

export default CopyButton;
