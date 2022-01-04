import { NEXT_FIELD_X } from "./config";
import Field from "./field";

export default class NextField extends Field {
  constructor(piece) {
    super(piece);

    this.fieldXPostion = NEXT_FIELD_X;
  }
}
