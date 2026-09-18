package com.vedickundli.app;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Ensure webview does NOT go behind status bar or system navigation bar
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
    }
}
