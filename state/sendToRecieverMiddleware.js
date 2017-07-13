const APPLICATION_ID = 'A8A1944C';
const NAMESPACE = 'urn:x-cast:com.google.cast.codenames.action';

let session = null;
let sender = undefined;
let globalCast = null;

const initializeCastApi = () => {
  sender = globalCast.framework.CastContext.getInstance();
  sender.setOptions({
    receiverApplicationId: APPLICATION_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED // eslint-disable-line no-undef
  });
};

window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    globalCast = cast; // eslint-disable-line no-undef
    initializeCastApi();
  }
};

function sendAction(message) {
  if (session != null) {
    session.sendMessage(
      NAMESPACE,
      JSON.stringify(message),
      () => console.log('Message sent: ' + message),
      () => console.log('Message failed to send: ' + message)
    );
  }
  else {
    session = globalCast.framework.CastContext.getInstance().getCurrentSession();
    session.sendMessage(
      NAMESPACE,
      JSON.stringify(message),
      () => console.log('Message sent: ' + message),
      () => console.log('Message failed to send: ' + message)
    );
  }
}

export default store => next => action => {
  if(action.sendToReciever) {
    sendAction(action);
  }
  return next(action);
}
