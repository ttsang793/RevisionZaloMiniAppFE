import { Box, Text, Input, Select } from "zmp-ui";
import { useState, useEffect } from 'react';
import { getSubjects, Subject } from "@/models/subject";
import { HomeFilter as Filter } from "@/models/exam";

interface FilterModalProp {
  visible: boolean;
  setVisible: (v: boolean) => void;
  filter: Filter;
  setFilter: (f: Filter) => void;
  fetchData: (f: Filter | null) => Promise<void>;
}

const HomeFilter = ({visible, setVisible, filter, setFilter, fetchData}: FilterModalProp) => {
  const [defaultFilter, setDefaultFilter] = useState(filter);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);

  const loadData = async() => {
    try {
      const data = await getSubjects();
      setSubjectList(data);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { loadData() }, []);

  return (
    <Box className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-900/50 h-full z-50 ${visible ? "flex items-center justify-center" : "hidden"}`}>
      <Box className="bg-white mx-10 p-8 pb-4 relative rounded-lg">
        <button className="absolute top-2 right-5 text-3xl" onClick={closeModal}>&times;</button>
        
        <Text.Title className="mb-4">Chọn tiêu chí</Text.Title>

        <Input
          label="Tiêu đề" placeholder="Tiêu đề"
          value={filter.search}
          onChange={e => setFilter({...filter, search: e.target.value})}
        />

        <Select
          label="Môn học" closeOnSelect value={filter.subject}
          onChange={(e: string) => setFilter({...filter, subject: e})}
        >
          <Select.Option value="" title="Tất cả" />
          {
            subjectList.map((subject: Subject) => <Select.Option value={subject.id} title={subject.name} key={subject.id} />)
          }
        </Select>

        <Select
            label="Lớp" closeOnSelect value={filter.grade}
            onChange={(e: number) => setFilter({...filter, grade: e})}
          >
            <Select.Option value={-1} title="Tất cả" />
            <Select.Option value={6} title="Lớp 6" />
            <Select.Option value={7} title="Lớp 7" />
            <Select.Option value={8} title="Lớp 8" />
            <Select.Option value={9} title="Lớp 9" />
            <Select.Option value={10} title="Lớp 10" />
            <Select.Option value={11} title="Lớp 11" />
            <Select.Option value={12} title="Lớp 12" />
          </Select>

        <Select
          label="Loại bài kiểm tra" closeOnSelect value={filter.type}
          onChange={(e: '' | 'regular' | 'midterm' | 'final' | 'other') => {
            setFilter({...filter, type: e})
          }}
        >
          <Select.Option value="" title="Tất cả" />
          <Select.Option value="regular" title="Kiểm tra thường xuyên" />
          <Select.Option value="midterm" title="Kiểm tra giữa kì" />
          <Select.Option value="final" title="Kiểm tra học kì" />
          <Select.Option value="other" title="Khác" />
        </Select>

        <Box className="text-center mt-3">
          <button className="zaui-bg-blue-80 text-white rounded-full py-2 px-6 me-3" onClick={handleFilter}>
            Lọc
          </button>
          
          <button className="zaui-bg-blue-20 text-blue-80 rounded-full py-2 px-6" onClick={resetFilter}>
            Xóa lọc
          </button>
        </Box>
      </Box>      
    </Box>
  )

  function handleFilter() {
    fetchData(filter);
    setVisible(false);
  }

  function resetFilter() {
    setFilter(new Filter());
    fetchData(null);
    setVisible(false);
  }

  function closeModal() {
    setFilter(defaultFilter);
    setVisible(false);
  }
}

export default HomeFilter;