import React, { Component } from 'react';
import { Button, View, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    StringeeClient,
    StringeeCall,
    StringeeVideoView
} from "stringee-react-native";

const token0 = "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS09TUGZiQmJlazNrRzRwR0JiYjJvUVdpSGduNFAyc0xlLTE2MDE4NjgyMjUiLCJpc3MiOiJTS09TUGZiQmJlazNrRzRwR0JiYjJvUVdpSGduNFAyc0xlIiwiZXhwIjoxNjA0NDYwMjI1LCJ1c2VySWQiOiJ1c2VyMCJ9.HhG4c9kKcf3q03ASzc0HlzUZzW48AbyG9YwFn1PIdb4";
const token1 = "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS09TUGZiQmJlazNrRzRwR0JiYjJvUVdpSGduNFAyc0xlLTE2MDE4NjgyNTQiLCJpc3MiOiJTS09TUGZiQmJlazNrRzRwR0JiYjJvUVdpSGduNFAyc0xlIiwiZXhwIjoxNjA0NDYwMjU0LCJ1c2VySWQiOiJ1c2VyMSJ9.2RxqvERoJQMltxHx07aOwBrkUtjIFMgZVFQPJw0bqo8";

export default class Home extends Component {
    constructor(props) {
        super(props);

        var random = Math.floor(Math.random() * 10);

        this.state = {
            // user: Platform.OS == 'ios' ? 'user1' : 'user0',
            user: random % 2 ? 'user1' : 'user0',
            isShowActionButtons: false,
            callId: null,
            hasReceivedLocalStream: false,
            hasReceivedRemoteStream: false,
            answer: false,
            isCaller: false
        }

        this.clientEventHandlers = {
            onConnect: this._clientDidConnect,
            onDisConnect: this._clientDidDisConnect,
            onFailWithError: this._clientDidFailWithError,
            onRequestAccessToken: this._clientRequestAccessToken,
            onIncomingCall: this._callIncomingCall,
        }

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

    async componentDidMount() {
        await this.refs.client.connect(this.state.user == 'user0' ? token0 : token1);
    }

    // The client connects to Stringee server
    _clientDidConnect = ({ userId }) => {
        console.log('_clientDidConnect - ' + userId);
    }

    // The client disconnects from Stringee server
    _clientDidDisConnect = () => {
        console.log('_clientDidDisConnect');
    }

    // The client fails to connects to Stringee server
    _clientDidFailWithError = () => {
        console.log('_clientDidFailWithError');
    }

    // Access token is expired. A new access token is required to connect to Stringee server
    _clientRequestAccessToken = () => {
        console.log("_clientRequestAccessToken");
        // this.refs.client.connect('NEW_YOUR_ACCESS_TOKEN');
    }

    // IncomingCall event
    _callIncomingCall = ({ callId, from, to, fromAlias, toAlias, callType, isVideoCall }) => {
        console.log("IncomingCallId-" + callId + ' from-' + from + ' to-' + to + ' fromAlias-' + fromAlias + ' toAlias-' + toAlias + ' isVideoCall-' + isVideoCall + 'callType-' + callType);

        this.setState({
            isShowActionButtons: true,
            callId: callId
        })
    }

    /**
     * For stringee call
     */
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
        this.setState({ hasReceivedLocalStream: true });
    }
    // Invoked when the remote stream is available
    _callDidReceiveRemoteStream = ({ callId }) => {
        console.log('_callDidReceiveRemoteStream ' + callId);
        this.setState({ hasReceivedRemoteStream: true });
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

    /**
     * Answer
     */
    initAnswer() {
        this.refs.stringeeCall.initAnswer(this.state.callId, (status, code, message) => {
            console.log(message, status, code);
            if (status) {
                // Sucess
                this.setState({ answer: true })
            } else {
                // Fail
            }
        });
    }

    answer() {
        this.refs.stringeeCall.answer(this.state.callId, (status, code, message) => {
            console.log(message, status, code);
            if (status) {
                // Sucess
                this.setState({ hasReceivedLocalStream: true, hasReceivedRemoteStream: true });
            } else {
                // Fail
            }
        });
    }

    reject() {
        this.refs.stringeeCall.reject(this.state.callId, (status, code, message) => {
            console.log(message, status, code);
            if (status) {
                // Sucess
            } else {
                // Fail
            }
        });
    }

    call() {
        var currentUser = this.state.user;

        const myObj = {
            from: currentUser, // caller
            to: currentUser == 'user0' ? 'user1' : 'user0', // callee
            isVideoCall: true, // Cuộc gọi là video call hoặc voice call 
            videoResolution: 'NORMAL' // chất lượng hình ảnh 'NORMAL' hoặc 'HD'. Mặc định là 'NORMAL'.
        };

        const parameters = JSON.stringify(myObj);

        this.refs.stringeeCall.makeCall(parameters, (status, code, message, callId) => {
            console.log('Calling: ...... status-' + status + ' code-' + code + ' message-' + message + ' callId-' + callId);
            if (status) {
                // Sucess
            } else {
                // Fail
            }
        })

        this.setState({isCaller: true})
    }

    render() {
        var { user, isShowActionButtons, hasReceivedLocalStream, callId, hasReceivedRemoteStream, answer } = this.state;

        console.log(callId);
        return (
            <SafeAreaView>
                <Text>{user}</Text>
                {/* <Button
                    title="Call"
                    onPress={() => this.props.navigation.navigate('Call', { user: user })}
                /> */}
                <Button
                    title="Call"
                    onPress={() => this.call()}
                />
                {
                    isShowActionButtons ? (
                        <View>
                            {
                                answer ? (
                                    <Button
                                        title="Answer"
                                        onPress={() => this.answer()}
                                    />
                                ) : (
                                        <Button
                                            title="Init Answer"
                                            onPress={() => this.initAnswer()}
                                        />
                                    )
                            }
                            <Button
                                title="Reject"
                                onPress={() => this.reject()}
                            />
                        </View>
                    ) : null
                }
                <StringeeClient
                    ref="client"
                    eventHandlers={this.clientEventHandlers}
                />
                <StringeeCall
                    ref="stringeeCall"
                    eventHandlers={this.callEventHandlers}
                />
                {
                    hasReceivedLocalStream ? <StringeeVideoView
                        style={{ backgroundColor: 'black', width: 100, height: 100 }}
                        callId={callId}
                        streamId=''
                        local={true}
                        overlay={true}
                    /> : null
                }
                {hasReceivedRemoteStream ? <StringeeVideoView
                    style={{
                        backgroundColor: 'black',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 200,
                        height: 200,
                        zIndex: 0,
                    }}
                    callId={callId}
                    streamId=''
                    local={false}
                /> : null
                }
            </SafeAreaView>
        )
    }
}
