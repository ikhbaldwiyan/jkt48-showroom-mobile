package com.inzoid.jkt48showroom;

import android.app.PictureInPictureParams;
import android.os.Build;
import android.util.Rational;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class PipModule extends ReactContextBaseJavaModule {
    private Rational aspectRatio;

    PipModule(ReactApplicationContext context){
        super(context);
    }

    @Override
    public String getName(){
        return "PipModule";
    }

    @ReactMethod
    public void EnterPipMode(int videoWidth, int videoHeight){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            if (videoWidth > 0 && videoHeight > 0) {
                aspectRatio = new Rational(videoWidth, videoHeight);  // Calculate aspect ratio dynamically
            } else {
                aspectRatio = new Rational(3, 4);  // Default aspect ratio
            }

            PictureInPictureParams params = new PictureInPictureParams.Builder()
                .setAspectRatio(aspectRatio)
                .build();
            getCurrentActivity().enterPictureInPictureMode(params);
        }
    }
}
