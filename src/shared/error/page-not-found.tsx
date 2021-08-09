import React from 'react';
import Alert from '@material-ui/lab/Alert';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <Alert severity="error">Upssss... esta página no existe :( </Alert>
      </div>
    );
  }
}

export default PageNotFound;
