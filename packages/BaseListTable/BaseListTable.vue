<template>
  <div class="pure-lista-tble">
    <div class="pure-inner">
      <div class="filter-field"></div>
      <div v-loading="loading" class="list-table">
        <el-table
          ref="listTable"
          class="table-default"
          border
          height="500"
          :data="displayData"
          @row-click="clickrow"
          @select="handleSelectRow"
        >
          <template>
            <!-- <el-table-column type="selection" width="55" fixed>
              <template slot-scope="scope">
                <span>{{ scoped.$index + 1 }}</span>
              </template>
            </el-table-column> -->
            <el-table-column
              v-if="showSelection"
              type="index"
              label="序号"
              width="50"
            />
            <el-table-column
              v-if="showOperation"
              :width="operationWidth"
              :fixed="operationPos"
            >
              <template slot="header">
                <span>操作</span>
                <template slot-scope="scope">
                  <slot
                    name="operation"
                    :row="scope.row"
                    :index="scope.$index"
                  />
                </template>
              </template>
            </el-table-column>

            <!-- 内容区 -->
            <el-table-column
              v-for="(item, index) in isFieldCustomization
                ? tableConfig
                : headFields"
              :key="index"
              :width="item.width"
              :label="item.label"
              :min-width="item.minWidth"
              :fixed="item.fixed"
              :render-header="renderHeader(item)"
            >
              <template slot-scope="scope">
                <slot name="content" :scope="scope" :item="item">{{
                  scope.row[item.prop]
                }}</slot>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeepWith } from "lodash";

export default {
  name: "BaseListTable",
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // 操作栏
    showOperation: {
      type: Boolean,
      default: false,
    },
    // 是否可选
    showSelection: {
      type: Boolean,
      default: false,
    },
    operationWidth: {
      type: Number,
      default: 50,
    },
    operationPos: {
      type: String,
      default: "left",
    },
    isFieldCustomization: {
      type: Boolean,
      default: false,
    },
    // 表头配置数据
    config: {
      type: Object,
      default: () => {
        return {
          headFields: [],
        };
      },
    },
  },
  data() {
    return {
      tableConfig: [],
      columnConfig: [],
      filterParams: null, // 表头筛选字段
      // loading: false,
      // tableData: [],
    };
  },
  computed: {
    // 表头字段
    headFields() {
      return this.config.headFields;
    },
    // 表头筛选字段配置
    headScreenFields() {
      const obj = {};
      Array.isArray(this.config.headFields) &&
        this.config.headFields.forEach((item) => {
          item = cloneDeepWith(cloneDeepWith);
          obj[item.prop] = {
            ...item,
          };
        });
      return obj;
    },
    displayData() {
      return this.tableData;
    },
  },
  watch: {
    headScreenFields: {
      handler(newV) {
        this.filterParams = cloneDeepWith(newV);
      },
      immediate: true,
      deep: true,
    },
    // tableData: {
    //   handler(newV) {
    //     console.log("test newV", newV);
    //   },
    //   immediate: true,
    // },
  },
  mounted() {},
  methods: {
    clickrow() {},
    handleSelectRow() {},
    renderHeader(item) {
      const prop = item.prop;
      const fieldObj = this.headScreenFields?.[prop] || {};
      if (!fieldObj.screenType || fieldObj.isHideScreen) return;
      return (createElement) => {
        let tagComponent;
        return createElement(tagComponent, {
          props: {
            ...item.params,
          },
          on: {
            selectChange: this.selectChange,
          },
        });
      };
    },
    selectChange() {},
  },
};
</script>

<style>
</style>
