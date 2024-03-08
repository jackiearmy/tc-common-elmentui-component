<template>
  <div>
    <BaseListTable
      ref="testTable"
      :loading="loading"
      :config="tableConfig"
      :tableData="tableData"
    ></BaseListTable>
  </div>
</template>

<script>
import { myTestTableConfig } from "./config/tableHeadFields";
import { getTestList } from "@/api/table";
export default {
  name: "BaseList",
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  computed: {
    tableConfig() {
      // console.log("test myTestTableConfig", myTestTableConfig);
      return {
        headFields: myTestTableConfig,
      };
    },
    tableHeadScreenFields() {
      const obj = {};
      myTestTableConfig.array.forEach((item) => {
        obj[item.prop] = item;
      });
      return obj;
    },
    pageSizeStore() {
      return this.$store.common?.pageSize;
    },
  },
  async created() {
    try {
      const tableRes = await getTestList();
      this.tableData = tableRes.data.items.items;
    } catch (err) {}
  },
};
</script>

<style>
</style>
