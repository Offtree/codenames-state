import * as c from './constants';
import { makeGameStore as mgs } from './state';
import * as s from './selectors';
import * as a from './actions';

export const makeGameStore = mgs;
export const constants = c;
export const selectors = s;
export const actions = a;
