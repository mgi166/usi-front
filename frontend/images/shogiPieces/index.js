import _ from 'lodash';

import UpsidePawn from './Sfu.png';
import DownsidePawn from './Gfu.png';
import UpsidePromotedPawn from './Sto.png';
import DownsidePromotedPawn from './Gto.png';

import UpsideLance from './Skyo.png';
import DownsideLance from './Gkyo.png';
import UpsidePromotedLance from './Snkyo.png';
import DownsidePromotedLance from './Gnkyo.png';

import UpsideKnight from './Skei.png';
import DownsideKnight from './Gkei.png';
import UpsidePromotedKnight from './Snkei.png';
import DownsidePromotedKnight from './Gnkei.png';

import UpsideSilver from './Sgin.png';
import DownsideSilver from './Ggin.png';
import UpsidePromotedSilver from './Sngin.png';
import DownsidePromotedSilver from './Gngin.png';

import UpsideGold from './Skin.png';
import DownsideGold from './Gkin.png';

import UpsideKing from './Sou.png';
import DownsideKing from './Gou.png';

import UpsideRook from './Shi.png';
import DownsideRook from './Ghi.png';
import UpsidePromotedRook from './Sryu.png';
import DownsidePromotedRook from './Gryu.png';

import UpsideBishop from './Skaku.png';
import DownsideBishop from './Gkaku.png';
import UpsidePromotedBishop from './Suma.png';
import DownsidePromotedBishop from './Guma.png';

const PIECE_TYPE_TO_IMAGE_FILE_MAP = {
  upside: {
    'p': UpsidePawn,
    'p+': UpsidePromotedPawn,
    'l': UpsideLance,
    'l+': UpsidePromotedLance,
    'n': UpsideKnight,
    'n+': UpsidePromotedKnight,
    's': UpsideSilver,
    's+': UpsidePromotedSilver,
    'g': UpsideGold,
    'k': UpsideKing,
    'r': UpsideRook,
    'r+': UpsidePromotedRook,
    'b': UpsideBishop,
    'b+': UpsidePromotedBishop
  },
  downside: {
    'p': DownsidePawn,
    'p+': DownsidePromotedPawn,
    'l': DownsideLance,
    'l+': DownsidePromotedLance,
    'n': DownsideKnight,
    'n+': DownsidePromotedKnight,
    's': DownsideSilver,
    's+': DownsidePromotedSilver,
    'g': DownsideGold,
    'k': DownsideKing,
    'r': DownsideRook,
    'r+': DownsidePromotedRook,
    'b': DownsideBishop,
    'b+': DownsidePromotedBishop
  }
};

export function getPieceImage(piece) {
  var key = _.lowerFirst(piece.type);
  var mapKey = piece.isBlack() ? 'upside' : 'downside';
  return PIECE_TYPE_TO_IMAGE_FILE_MAP[mapKey][key];
}
