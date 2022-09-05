import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
    state = { hasError: false, redirect: false };

    static getDerivedFromError() {
        return {hasError: true};

    }
    // componentDidCatch(error, info) {
    //     console.error(error, info);
    // }

    componentDidUpdate() {
       if (this.state.hasError) {
        setTimeout(() => this.setState({ redirect: true }), 5000)
       }
    }

    render () {
        if( this.state.redirect){
            return <Navigate to="/" />;
        }
        if (this.state.hasError) {
            return (
                <h2>
                    There was an error!
                    <Link to="/">Click Here!</Link> to go back to the homepage.
                    Or wait 5 seconds and we will do it automatically.
                </h2>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;