<?php

namespace Civi\Api4\Action\ReportListOrder;

use Civi\Api4\Generic\AbstractAction;
use Civi\Api4\Generic\Result;

/**
 * Saves the report ordering for the current user.
 *
 * @method $this setValue(string $value)
 */
class Set extends AbstractAction {

  /**
   * Comma-separated list of report instance IDs in desired order.
   * @var string
   * @required
   */
  protected $value;

  public function _run(Result $result): void {
    $contactId = \CRM_Core_Session::singleton()->getLoggedInContactID();
    if ($contactId) {
      // DELETE before SET to prevent duplicate entries
      \CRM_Core_DAO::executeQuery(
        "DELETE FROM `civicrm_setting` WHERE `name` = %1",
        [1 => ['reportlist.' . $contactId, 'String']]
      );
      \CRM_Core_BAO_Setting::setItem($this->value, NULL, 'reportlist.' . $contactId);
    }
    $result[] = ['success' => TRUE];
  }

}
