import {LAUNCH_FEEDBACK, DISMISS_FEEDBACK} from '../types';

// notify results
const launch = payload => ({
  type: LAUNCH_FEEDBACK,
  payload,
});

const dismiss = () => ({
  type: DISMISS_FEEDBACK,
});


export default {
  launch,
  dismiss,
};