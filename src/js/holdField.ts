import { HOLD_FIELD_X } from "./config";
import Field from "./field";

export default class HoldField extends Field {
  constructor(piece = null) {
    super(piece);

    this.fieldXPostion = HOLD_FIELD_X;
  }
}
