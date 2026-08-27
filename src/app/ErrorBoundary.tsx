import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio render error", error, info);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="error-boundary" role="alert">
        <p className="error-boundary__eyebrow">$ render_failed</p>
        <h1>Портфолио не загрузилось</h1>
        <p>
          Что-то сломалось при отрисовке страницы. Можно перезагрузить сайт и
          попробовать ещё раз.
        </p>
        <button type="button" onClick={this.handleReload}>
          Перезагрузить
        </button>
      </main>
    );
  }
}
