<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    slicedUbikeStops:{
        type: Array
    },
    searchText:{
        type: String
    },
    currentSort:{
        type: String
    },
    isSortDesc:{
        type: Boolean
    }
})
const emit = defineEmits(['sortByKey','isDesc'])

const timeFormat = (val) => {
  // 時間格式
  const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  return val.replace(pattern, '$1/$2/$3 $4:$5:$6');
};

// 指定排序
const setSort = sortType => {
  if (sortType === props.currentSort) {
    emit('isDesc', !props.isSortDesc)
    // props.isSortDesc = !props.isSortDesc;
  } else {
    emit('sortByKey', sortType)
    emit('isDesc', false)
    // props.currentSort = sortType;
    // props.isSortDesc = false;
  }
};

// 關鍵字 Highlight
const keywordsHighlight = (text, keyword) => {
  if (!keyword) return text
  const reg = new RegExp(keyword, 'gi');
  return text.replace(reg, `<span style="color: red;">${keyword}</span>`);
};


</script>
<template>
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="setSort('sno')">
            #
            <span v-show="currentSort === 'sno'">
              <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
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
              <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
            </span>
          </th>
          <th @click="setSort('tot')" class="pointer">
            總停車格
            <span v-show="currentSort === 'tot'">
              <i class="fa" :class="isSortDesc ? 'fa-sort-desc' : 'fa-sort-asc'" aria-hidden="true"></i>
            </span>
          </th>
          <th>
            資料更新時間
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 替換成 slicedUbikeStops -->
        <tr v-for="s in slicedUbikeStops" :key="s.sno">
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
<style scoped>
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