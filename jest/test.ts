// FIXED: Initialize global $localize macro function before compiling standalone templates with i18n attributes
import "@angular/localize/init";

import { setupZonelessTestEnv } from "jest-preset-angular/setup-env/zoneless";

setupZonelessTestEnv();
