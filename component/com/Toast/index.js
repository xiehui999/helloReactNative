import React, {
    Component,
} from 'react';
import RootView from '../RootView'
import ToastView from './ToastView'


class Toast {
    static LONG = 2000;
    static SHORT = 1000;

    static show(msg) {
        RootView.setView(<ToastView
            message={msg}
            onDismiss={() => {
                RootView.setView()
            }}/>)
    }

    static show(msg, time) {
        RootView.setView(<ToastView
            message={msg}
            time={time}
            onDismiss={() => {
                RootView.setView()
            }}/>)
    }
}

export default Toast
