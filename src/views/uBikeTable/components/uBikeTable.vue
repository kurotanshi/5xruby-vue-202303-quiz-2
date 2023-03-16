<script setup>
import { ref } from 'vue';
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    searchText: {
        type: String,
        required: true
    },
    currentSort: {
        type: String,
        required: true
    },
    isSortDesc: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(['update:currentSort','update:isSortDesc']);

const timeFormat = (val) => {
  // 時間格式
  const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  return val.replace(pattern, '$1/$2/$3 $4:$5:$6');
};

// 關鍵字 Highlight
const keywordsHighlight = (text, keyword) => {
  const reg = new RegExp(keyword, 'gi');
  return text.replace(reg, `<span style="color: red;">${keyword}</span>`);
};

// 指定排序
const currentSort = ref(props.currentSort);
const isSortDesc = ref(props.isSortDesc);
const setSort = sortType => {
  if (sortType === currentSort.value) {
    isSortDesc.value = !isSortDesc.value;
  } else {
    currentSort.value = sortType;
    isSortDesc.value = false;
  }
  emits('update:currentSort',currentSort.value);
  emits('update:isSortDesc',isSortDesc.value);
};
</script>

<template>
    <table class="table table-striped">
      <thead>
        <tr> 
          <th @click="setSort('sno')">
            <span v-show="currentSort === 'sno'">
              <i class="fa" :class="isSortDesc ? 'bi-caret-down-fill' : 'bi-caret-up-fill'" aria-hidden="true"></i>
            </span>
          </th>
          <th>
            場站名稱
          </th>
          <th>
            場站區域
          </th>
          <th @click="setSort('sbi')" class="pointer">
            目前可用車輛
            <span v-show="currentSort === 'sbi'">
              <i class="fa" :class="isSortDesc ? 'bi-caret-down-fill' : 'bi-caret-up-fill'" aria-hidden="true"></i>
            </span>
          </th>
          <th @click="setSort('tot')" class="pointer">
            總停車格
            <span v-show="currentSort === 'tot'">
              <i class="fa" :class="isSortDesc ? 'bi-caret-down-fill' : 'bi-caret-up-fill'" aria-hidden="true"></i>
            </span>
          </th>
          <th>
            資料更新時間
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 替換成 slicedUbikeStops -->
        <tr v-for="s in data" :key="s.sno">
          <td>{{ s.sno }}</td>
          <!-- <td>{{ s.sna }}</td> -->
          <td v-html="keywordsHighlight(s.sna, searchText)"></td>
          <td>{{ s.sarea }}</td>
          <td>{{ s.sbi }}</td>
          <td>{{ s.tot }}</td>
          <td>{{ timeFormat(s.mday) }}</td>
        </tr>
      </tbody>
    </table>
</template>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
@media (max-width: 768px) {
  .sno {
    max-width: 50px; word-wrap: break-word;
  }
  .table td, .table th {
    padding: .5rem .25rem;
  }
}
</style>
