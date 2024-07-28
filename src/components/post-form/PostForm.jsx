import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from '../Button';
import Input from '../Input';
import RealTimeEditor from "../RealTimeEditor";
import Select from '../Select'
import appwrite from '../../appwrite/config'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    //we are using setValue and getValues to get any values out of any fieldwe just have to provide name of that.

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile(post.featureImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featureImage: file ? file.$id : undefined
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file = await appwriteService.uploadFile(data.image[0])
            if(file){
                const fileId = file.$id
                data.featureImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data, 
                    userId: userData.$id
                })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-')
    }, [])

    React.useEffect(() => {
        watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)}
            className="flex flex-wrap">
            <div
                className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })} />

                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }} />
                <RealTimeEditor
                    label="Content: "
                    name="content"
                    control={control}   //passing to control to get values automatically
                    defaultValue={getValues("content")} />
            </div>

            <div
                className='1/3 px-2'>
                <Input
                    label="Featured Image"
                    type='file'
                    className='mb-4'
                    accept='image/png, image/jpg, image/jpeg'
                    {...register("image", { required: !post })} />
                {
                    post && (
                        <div
                            className="w-full mb-4">
                            <img src={appwriteService.getFilePreview(post.featureImage)} alt={post.title}
                                className="rounded-lg" />
                        </div>
                    )
                }
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })} />
                <Button
                    type="submit"
                    bgColor={post ? 'bg-green-500' : undefined}
                    className="w-full">{post ? 'Update' : 'Submit'}</Button>
            </div>
        </form>
    )
}
export default PostForm