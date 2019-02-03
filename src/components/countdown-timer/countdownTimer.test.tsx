import { h } from "preact";
import { render } from "preact-render-to-string";
import { CountdownTimer } from "./CountdownTimer";

describe("Countdown timer start", () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        render(
            <CountdownTimer
                initialValue={0}
                onCountdownComplete={() => {
                    return;
                }}
            />,
            div
        );
    });
});

describe("Countdown timer snapshot", () => {
    it("should render header with content", () => {
        const tree = render(
            <CountdownTimer
                initialValue={0}
                onCountdownComplete={() => {
                    return;
                }}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});

console.log("I (test) render");
