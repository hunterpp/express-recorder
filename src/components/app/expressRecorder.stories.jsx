import { h } from "preact";
import { storiesOf } from "@storybook/react";
import { ExpressRecorder } from "./ExpressRecorder";

storiesOf("Main App", module).add("widget default", () => {
    return (
        <div>
            <ExpressRecorder
                ks={"djJ8MjMyNjgyMXyC9uaZ5nhNVHdKHQPSPZYscYcs8_rIMa_wwXvH7op6wFmU3VN9q17rG4WQqKHPHpS-zvXhvLpHJFLqfrKhLX7_HxjvxoSl1ipnMEoM8gR5EtgWNktXAN9hqKQsvt4XInwbusArQGjBQeBPW6JteCkaeny3EU23NqaA_xgTgGZ6zQ=="}
				app={"kms_client"}
                serviceUrl={"https://www.kaltura.com"}
				partnerId={2326821}
				uiConfId={43638711}
				playerUrl={"https://cdnapisec.kaltura.com"}
            />
        </div>
    );
});

