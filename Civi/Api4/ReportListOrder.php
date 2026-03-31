<?php

namespace Civi\Api4;

use Civi\Api4\Generic\AbstractEntity;
use Civi\Api4\Generic\BasicGetFieldsAction;

/**
 * ReportListOrder entity - manages per-user ordering of report instances.
 *
 * @searchable none
 */
class ReportListOrder extends AbstractEntity {

  /**
   * Returns field metadata for this entity.
   */
  public static function getFields($checkPermissions = TRUE): BasicGetFieldsAction {
    return new BasicGetFieldsAction(static::class, __FUNCTION__, function () {
      return [
        [
          'name' => 'value',
          'title' => 'Value',
          'description' => 'Comma-separated report instance IDs',
          'type' => 'Field',
          'data_type' => 'String',
          'required' => FALSE,
        ],
      ];
    });
  }

  /**
   * Returns the saved report order for the current user.
   */
  public static function get($checkPermissions = TRUE): Generic\BasicGetAction {
    return new Generic\BasicGetAction(static::class, __FUNCTION__, function () {
      $contactId = \CRM_Core_Session::singleton()->getLoggedInContactID();
      $value = \CRM_Core_BAO_Setting::getItem(NULL, 'reportlist.' . $contactId);
      if ($value !== NULL) {
        return [['value' => $value]];
      }
      return [];
    });
  }

  /**
   * Saves the report order for the current user.
   */
  public static function set($checkPermissions = TRUE): Action\ReportListOrder\Set {
    return new Action\ReportListOrder\Set(static::class, __FUNCTION__);
  }

  public static function permissions(): array {
    return ['default' => ['access CiviCRM']];
  }

}
