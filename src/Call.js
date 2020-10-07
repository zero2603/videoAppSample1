import React, { Component } from 'react';
import { Button, View } from 'react-native';
import {
    StringeeCall
} from "stringee-react-native";

export default class Call extends Component {
    constructor(props) {
        super(props);

        this.callEventHandlers = {
            onChangeSignalingState: this._callDidChangeSignalingState,
            onChangeMediaState: this._callDidChangeMediaState,
            onReceiveLocalStream: this._callDidReceiveLocalStream,
            onReceiveRemoteStream: this._callDidReceiveRemoteStream,
            onReceiveDtmfDigit: this._didReceiveDtmfDigit,
            onReceiveCallInfo: this._didReceiveCallInfo,
            onHandleOnAnotherDevice: this._didHandleOnAnotherDevice
        };
    }

    // Invoked when the call signaling state changes
    _callDidChangeSignalingState = ({ callId, code, reason, sipCode, sipReason }) => {
        console.log('callId-' + callId + 'code-' + code + ' reason-' + reason + ' sipCode-' + sipCode + ' sipReason-' + sipReason);
    }

    // Invoked when the call media state changes
    _callDidChangeMediaState = ({ callId, code, description }) => {
        console.log('callId-' + callId + 'code-' + code + ' description-' + description);
    }

    // Invoked when the local stream is available    
    _callDidReceiveLocalStream = ({ callId }) => {
        console.log('_callDidReceiveLocalStream ' + callId);
    }
    // Invoked when the remote stream is available
    _callDidReceiveRemoteStream = ({ callId }) => {
        console.log('_callDidReceiveRemoteStream ' + callId);
    }

    // Invoked when receives a DMTF
    _didReceiveDtmfDigit = ({ callId, dtmf }) => {
        console.log('_didReceiveDtmfDigit ' + callId + "***" + dtmf);
    }

    // Invoked when receives info from other clients
    _didReceiveCallInfo = ({ callId, data }) => {
        console.log('_didReceiveCallInfo ' + callId + "***" + data);
    }

    // Invoked when the call is handled on another device
    _didHandleOnAnotherDevice = ({ callId, code, description }) => {
        console.log('_didHandleOnAnotherDevice ' + callId + "***" + code + "***" + description);
    }

    call() {
        var currentUser = this.props.route.params.user;

        const myObj = {
            from: currentUser, // caller
            to: currentUser == 'user0' ? 'user1' : 'user0', // callee
            isVideoCall: true, // Cuộc gọi là video call hoặc voice call 
            videoResolution: 'NORMAL' // chất lượng hình ảnh 'NORMAL' hoặc 'HD'. Mặc định là 'NORMAL'.
        };

        const parameters = JSON.stringify(myObj);

        this.refs.stringeeCall.makeCall(parameters, (status, code, message, callId) => {
            console.log('status-' + status + ' code-' + code + ' message-' + message + 'callId-' + callId);
            if (status) {
                // Sucess
            } else {
                // Fail
            }
        })
    }

    render() {
        return (
            <View>
                <Button title="Call" onPress={() => this.call()}></Button>
                <StringeeCall
                    ref="stringeeCall"
                    eventHandlers={this.callEventHandlers}
                />
            </View>
        )
    }
}
