import { h, Component } from "preact";
import { Playback } from "../playback/playback";
const styles = require("./style.scss");

type Props = {
    video: boolean;
    audio: boolean;
    stream: MediaStream;
    onError?: (error: string) => void;
    doRecording: boolean;
    onRecordingEnd: (recorderBlobs: Blob[]) => void;
    discard?: boolean;
    doPlayback: boolean;
    partnerId: number;
    uiConfId: number;
};

type State = {};

/**
 * Handle the actual recording with given stream. Gather all blob data and handle start/stop.
 */
export class Recorder extends Component<Props, State> {
    static defaultProps = {
        video: true,
        audio: true,
        doRecording: false,
        discard: false,
        doPlayback: false
    };

    mediaRecorder: any;
    recordedBlobs: Blob[];
    videoRef: HTMLMediaElement | null;

    constructor(props: Props) {
        super(props);

        this.mediaRecorder = null;
        this.videoRef = null;
        this.recordedBlobs = [];
    }

    componentDidUpdate(prevProps: Props) {
        const { stream, doRecording, discard, doPlayback } = this.props;

        if (!doPlayback) {
            this.videoRef!.srcObject = stream;
        }

        if (doRecording !== prevProps.doRecording) {
            this.toggleRecording();
        }

        if (discard) {
            this.recordedBlobs = [];
        }
    }

    toggleRecording = () => {
        const doRecording = this.props.doRecording;
        if (doRecording) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
    };

    startRecording = () => {
        const { stream } = this.props;
        let options = { mimeType: "video/webm;codecs=vp9" };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: "video/webm;codecs=vp8" };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options = { mimeType: "video/webm" };
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    options = { mimeType: "" };
                }
            }
        }
        try {
            this.mediaRecorder = new MediaRecorder(stream, options);
        } catch (e) {
            if (this.props.onError) {
                return this.props.onError(
                    "Exception while creating MediaRecorder: " + e
                );
            }
            return;
        }

        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder.start(10); // collect 10ms of data
    };

    stopRecording = () => {
        this.mediaRecorder.stop();
        if (this.props.onRecordingEnd) {
            this.props.onRecordingEnd(this.recordedBlobs);
        }
    };

    handleDataAvailable = (event: any) => {
        if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
        }
    };

    render(props: Props) {
        const { doPlayback, partnerId, uiConfId } = this.props;

        if (doPlayback && this.recordedBlobs.length > 0) {
            const media = {
                blob: new Blob(this.recordedBlobs, { type: "video/webm" }),
                mimeType: "video/webm"
            };

            return (
                <div className={styles["express-recorder__playback"]}>
                    <Playback
                        partnerId={partnerId}
                        uiconfId={uiConfId}
                        media={media}
                    />
                </div>
            );
        }

        return (
            <div>
                <video
                    id="recorder"
                    className={`express-recorder__recorder ${styles["express-recorder__recorder"]}`}
                    muted={true}
                    autoPlay={true}
                    ref={node => (this.videoRef = node as HTMLMediaElement)}
                />
            </div>
        );
    }
}