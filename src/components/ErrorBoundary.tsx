import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('current_kundli_profile');
    localStorage.removeItem('saved_kundli_profiles');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#101726] border border-red-500/40 rounded-3xl p-6 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle size={28} />
            </div>

            <h2 className="text-lg font-bold text-amber-200 font-serif mb-1">
              वैदिक कुंडली - प्रदर्शन त्रुटि
            </h2>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              ब्राउज़र में पुराना या अधूरा डेटा लोड होने के कारण यह समस्या आई। नीचे दिए गए बटन से रीसेट करें।
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-red-300 font-mono text-left mb-5 max-h-32 overflow-y-auto">
              {this.state.error?.message || 'Unknown render exception'}
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-xs flex items-center justify-center gap-2"
            >
              <RefreshCw size={15} /> डेटा रीसेट करें एवं पुनः लोड करें
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
