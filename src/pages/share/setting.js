import Layout from "../components/layout";
import {default as SortableTable}  from "../components/table/SortableTable";
import { useState, Fragment, Component, useEffect } from 'react';
import { Button, Radio, Table, Typography, Space,Form,
    Modal,Tooltip , Tag, Input, Popconfirm} from 'antd';
import { DownloadOutlined,AndroidOutlined, AndroidFilled,AppleFilled ,ApiFilled} from '@ant-design/icons';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined, UserOutlined, LockOutlined ,FileAddFilled} from '@ant-design/icons';
import arrayMove from 'array-move';
import { ShareService } from "../../services";
import { observer,inject } from "mobx-react";
import { Row, Col, Divider } from 'antd';

// import { Share } from "../../stores";


// AndroidOutlined
{/* <AppleOutlined /> <AndroidFilled /> <AppleFilled />*/}
// const store = new Share();
function Setting(props) {

    const  {share} = props;
    const  {schemas, title} = share;
    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [selectedItem,setSelectedItem] = useState({});

    const formLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      }

      const formBtnLayout = {
        labelCol: { span: 14 },
        wrapperCol: { span: 4 },
      }

    useEffect(() => {
        forceUpdate({});
      }, []);

    useEffect(async ()=>{
        console.log(props);
        await share.getAll();
    },[]);

    const onFinish = async (values) => {
        console.log('Finish:', values);
        await share.updateSchema(values);
      };

    const addSchema= async ()=>{
            try {
              const values = await form.validateFields();
              await share.updateSchema(values);
              setVisible(false);
            } catch (error) {
                console.log(error);
            }

     }

     const deleteSchema= async (schema)=>{
        try {
          await share.deleteSchema(schema);
        } catch (error) {
            console.log(error);
        }
    }

    const confirm = async (schema)=>{
        await  deleteSchema(schema);
    }

    const DragHandle = sortableHandle(() => (
        <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
      ));
 
    const columns = [
        {
          title: 'Sort',
          dataIndex: 'sort',
          width: 30,
          excluded:true,
          className: 'drag-visible',
          render: () => <DragHandle />,
        },
        {
            title: 'ID',
            dataIndex: 'id',
          },
        {
          title: 'Name',
          dataIndex: 'name',
          editAble:true,
          className: 'drag-visible',
        },
  
        {
          title: 'Link',
          dataIndex: 'schema',
          editAble:true,
          render:(row,rc)=>{
            return (
             <Tooltip title={rc.schema} color="#fc7166">
                   <Tag icon={<ApiFilled />}  color="volcano">gdind</Tag>
              </Tooltip>
            )
        }
        },
        {
            title: 'IOS',
            dataIndex: 'ios',
            editAble:true,
            render:(row,rc)=>{
                return (
                 <Tooltip title={rc.ios} color="#fc7166">
                       <Tag   icon={<AppleFilled />} color="volcano">itunes</Tag>
                  </Tooltip>
                )
            }
          },
          {
            title: 'Android',
            dataIndex: 'android',
            editAble:true,
            render:(row,rc)=>{
                return (
                 <Tooltip title={rc.android} color="#fc7166">
                       <Tag  icon={<AndroidFilled />} color="volcano">google store</Tag>
                  </Tooltip>
                )
            }
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            excluded:true,
            render: (row, record) => {
              return (
                <Space>
                    <Typography.Link onClick={() => {
                        form.setFieldsValue(record);
                        form.validateFields()
                        setVisible(true);
                    }
                    }>Edit</Typography.Link>
                    <Popconfirm
                            title="Are you sure to delete it?"
                            onConfirm={()=>confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                        <Typography.Link >Delete</Typography.Link>
                    </Popconfirm>
                </Space>
                )
            },
          },
      ];

    
  return (
    <Layout>
      <SortableTable
        dataSource={schemas}
        columns ={columns}
        rowKey='id'
      />
      <br></br>
         <Row justify="end">
         <Button onClick={()=>{
            setVisible(true);
            form.resetFields();
        }} icon={<FileAddFilled />}>
          New
        </Button>
    </Row>

       <Modal
          title="New"
          visible={visible}
          onOk={addSchema}
          onCancel={()=>setVisible(false)}
          okText="Conform"
          cancelText="Cancel" >
              <Form form={form} layout='horizontal'  name="horizontal_login"  {...formLayout}  onFinish={onFinish}>
                  {
                      columns.filter(item=>!item.excluded).map(item=>{
                        return(        
                            <Form.Item key={`${item.dataIndex}${item.title}`} initialValue='' style={!item.editAble?{display:"none"}:''}
                                label={item.title}
                                name={item.dataIndex}
                                rules={[{ required: item.editAble, message: `Please enter ${item.title.toLowerCase()}` }]}>
                                <Input />
                            </Form.Item>)
                      })
                  }
                {/* <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item> */}
                {/* <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item> */}
                {/* <Form.Item {...formBtnLayout} shouldUpdate={true}>
                    {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                        // !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }>
                        Log in
                    </Button>
                    )}
                </Form.Item> */}
                </Form>
      
        </Modal>
    </Layout>
  );
}
export default inject('share')(observer(Setting));

// export const getServerSideProps = async ctx => {
//     return {props:{dataSource:[]}};
// }