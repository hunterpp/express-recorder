import { h } from "preact";
import { storiesOf } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";



storiesOf("Progress bar", module)
	.add("render a progress bar", () => {
		return <ProgressBar percentage={50}/>
	} );