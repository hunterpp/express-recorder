import { render } from "preact-render-to-string";
import { CountdownTimer } from "./CountdownTimer";
import { h } from "preact";

it("Renders without crashing", () => {
    const div = document.createElement("div");
    render(
        <CountdownTimer
            initialValue={3}
            onCountdownComplete={() => {
                return;
            }}
        />,
        div
    );
});

it("Match snapshot", () => {
    const tree = render(
        <CountdownTimer
            initialValue={3}
            onCountdownComplete={() => {
                return;
            }}
        />
    );
    expect(tree).toMatchSnapshot();
});

console.log("I (test) render");
