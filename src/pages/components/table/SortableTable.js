import { useEffect, useState } from "react";
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import { Table } from 'antd';
import './sortabletable.module.less';
import { sortable_table_prefix_cls } from "../../../styles/prefix";

export default function SortableTable(props){

    const {dataSource, columns} = props;

    const [data,setDataSource] = useState(dataSource||[]);

    useEffect(()=>{
        setDataSource(data);
    },[])

    const SortableItem = sortableElement(props => <tr {...props} />);
    const SortableContainer = sortableContainer(props => <tbody {...props} />);

    const DraggableContainer = props => (
        <SortableContainer
          useDragHandle
          disableAutoscroll
          helperClass={`${sortable_table_prefix_cls}-row-dragging`}
          onSortEnd={onSortEnd}
          {...props}
        />
      );

      const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
          const newData = arrayMove([].concat(data), oldIndex, newIndex).filter(el => !!el);
          setDataSource(newData);
        }
      };
    
      const DraggableBodyRow = ({ className, style, ...restProps }) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = data.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
      };


      
  return (
      <Table  pagination={false} dataSource={dataSource} columns={columns} rowKey="id" 
        components={{
            body: {
                wrapper: DraggableContainer,
                row: DraggableBodyRow,
            },
            }}
      />
  );
    
}