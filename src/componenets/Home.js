import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import Button from "@material-ui/core/Button";

import EnhancedTable from "../componenets/table"


class Home extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    render() {
        const { isLoggingOut, logoutError } = this.props;

        return (
            <div style={{padding: 20}}>
                <div style={{textAlign: "right", paddingBottom: 20}}>
                    <Button
                        type="button"
                        variant="contained"
                        style={{marginTop: 10}}
                        onClick={this.handleLogout}
                        color="primary"
                        >
                        Log Out
                    </Button>
                </div>
                {isLoggingOut && <p>Logging Out....</p>}
                {logoutError && <p>Error logging out</p>}
                <EnhancedTable/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default connect(mapStateToProps)(Home);