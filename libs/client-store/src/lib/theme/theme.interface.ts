import { StateToken } from '@ngxs/store';
import { IActionPayload } from '@upgraded-enigma/client-util';

export interface IThemeStateModel {
  darkThemeEnabled: boolean;
}

export const themeInitialState: IThemeStateModel = {
  darkThemeEnabled: false,
};

export type TThemePayload = IActionPayload<IThemeStateModel>;

export const THEME_STATE_TOKEN = new StateToken<IThemeStateModel>('theme');
