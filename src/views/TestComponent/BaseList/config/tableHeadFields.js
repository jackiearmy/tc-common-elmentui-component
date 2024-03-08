import { cloneDeepWith } from 'lodash';
const myTestTableConfig = dealHeadFieldsConfig([
  {
    prop: 'bussinessKey',
    label: window.vue.$t('编码'),
    width: 'auto',
    fixed: true,
    screenType: 1,
    minWidth: 140,
    locked: true,
    slected: true,
  },
  {
    prop: 'contactName',
    label: window.vue.$t('合同名称'),
    width: 'auto',
    screenType: 1,
    minWidth: 140,
    slected: true
  },
  {
    prop: 'flowStatus',
    label: window.vue.$t('流程状态'),
    width: 'auto',
    screenType: 2,
    minWidth: 120,
    selected: true,
    apiEnumKey: 'statusFilter',
    screenKey: 'statusList'

  }
])

const defaultPropsObj = [
  { value: 'value', label: 'prop' },
  { value: 'itemCode', label: 'itemName' },
  { value: 'userUuid', label: 'userName' },
  { value: 'uuid', label: 'userLabel' },
  { value: 'value', label: 'label' },
];

function dealHeadFieldsConfig(configArr = []) {
  const tableHeaderArr = cloneDeepWith(configArr);
  Array.isArray(tableHeaderArr) && tableHeaderArr.forEach(item => {
    item.screenType = item.screenType || 0;
    item.type = item.screenType;
    item.enumField = item.apiEnumKey || item.lookupKey;
    if (item.screenType === 2) {
      item.multiple = true;
      item.value = [];
      item.data = [];
    } else {
      item.multiple = false;
      item.value = item.value || item.screenType === 7 ? [] : '';
    }
  });
  return tableHeaderArr;
}

export { myTestTableConfig, defaultPropsObj, dealHeadFieldsConfig }
