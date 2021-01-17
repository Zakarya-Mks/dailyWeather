import 'bootstrap';
import swal from 'sweetalert';

import '../scss/style.scss';

import { Weather } from './weatherAPI';
import * as controller from './controller';
import { View } from './view.js';
import * as domElemCollection from './domElemCollection';
import { GoeLocation } from './geoLocationAPI';
