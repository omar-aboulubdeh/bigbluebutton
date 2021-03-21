import Auth from '/imports/ui/services/auth';

const logoutRouteHandler = () => {
  Auth.logout()
    .then((logoutURL) => {
      if (logoutURL) {
        const protocolPattern = /^((http|https):\/\/)/;
        window.location.href = protocolPattern.test(logoutURL) ? `${logoutURL}?exit=endmeeting` : `http://${logoutURL}?exit=endmeeting`;
      }
    });
};

export default logoutRouteHandler;
