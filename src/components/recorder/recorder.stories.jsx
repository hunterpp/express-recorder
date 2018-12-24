import { h, Component } from "preact";
import { storiesOf } from "@storybook/react";
import { Recorder } from "./recorder";
import { react } from "preact";

class LoadData extends Component {
    state = {
        stream: null,
        isRecording: false
    };

    constructor(props) {
        super(props);

        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        const constraints = {
            audio: true,
            video: true
        };

        return navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
                return this.handleSuccess(stream);
            })
            .catch(this.handleError);
    }

    handleSuccess = s => {
        console.log("getUserMedia() got stream: ", s);
        this.setState({ stream: s });
    };

    handleError = error => {
        console.log("handleError : " + error);
    };

    toggleRecording = () => {
        this.setState(prevState => {
            return { isRecording: !prevState.isRecording };
        });
    };

    render() {
        return (
            <div>
                <Recorder
                    video={true}
                    audio={true}
                    stream={this.state.stream}
					isRecording={this.state.isRecording}
                />
                <div>
                    <button id="startRecord" onClick={this.toggleRecording}>
                        {this.state.isRecording && <span>Stop Recording</span>}
                        {!this.state.isRecording && (
                            <span>Start Recording</span>
                        )}
                    </button>
                </div>
            </div>
        );
    }
}

storiesOf("Recorder", module).add("simple recorder", () => <LoadData />);
