import Service from '@ember/service';
import {tracked} from "@glimmer/tracking";

const DEFAULT_MAIL_EXTENSION = "@gmail.com";

export default class LocalService extends Service {
  @tracked myUserName = "";
  @tracked myEmail = this.myUserName + DEFAULT_MAIL_EXTENSION;
  @tracked myID;
  @tracked isActive = false;

  @tracked usersData = [];
  @tracked chatData = [];
}
