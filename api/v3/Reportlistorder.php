<?php

/**
 * In civicrm 4.6 don't work correctly the api setting
 */
function civicrm_api3_reportlistorder_get($params) {
  $contact_id = CRM_Core_Session::singleton()->getLoggedInContactID();
  return civicrm_api3_create_success(CRM_Core_BAO_Setting::getItem(NULL, 'reportlist.' . $contact_id), $params, 'reportlistorder', 'get');
}

function civicrm_api3_reportlistorder_set($params) {
  $contact_id = CRM_Core_Session::singleton()->getLoggedInContactID();
  CRM_Core_DAO::executeQuery("DELETE FROM `civicrm_setting` WHERE `name` = 'reportlist." . $contact_id . "'"); //Some times is writed two times
  CRM_Core_BAO_Setting::setItem($params["value"], NULL, 'reportlist.' . $contact_id);
  return civicrm_api3_create_success(true, $params, NULL, 'set');
}
