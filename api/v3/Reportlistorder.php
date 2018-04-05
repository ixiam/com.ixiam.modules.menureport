<?php

/**
 * In civicrm 4.6 don't work correctly the api setting
 */
function civicrm_api3_reportlistorder_get($params) {
  return civicrm_api3_create_success(CRM_Core_BAO_Setting::getItem('reportlistsorter', 'reportlist'), $params, 'reportlistorder', 'get');
}


function civicrm_api3_reportlistorder_set($params) {  
  CRM_Core_DAO::executeQuery("DELETE FROM `civicrm_setting` WHERE `group_name` = 'reportlistsorter' AND `name` = 'reportlist'"); //Some times is writed two times
  CRM_Core_BAO_Setting::setItem($params["value"], 'reportlistsorter', 'reportlist');
  return civicrm_api3_create_success(true,$params, 'reportlistorder', 'set');
}
