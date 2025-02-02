'use client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { createProjectAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { queryClient } from "@/lib/react-query";

export function ProjectForm() {
    const { slug: org } = useParams<{ slug: string }>()

    const [{ success, message, errors }, handleSubmit, isPending] = useFormState(createProjectAction)
    if (success) {
        queryClient.invalidateQueries({ queryKey: [org, 'projects'] })
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {!success && message && (
                <Alert variant='destructive'>
                    <AlertTriangle className='size-4' />
                    <AlertTitle>Save project failed!</AlertTitle>
                    <AlertDescription><p>{message}</p></AlertDescription>
                </Alert>
            )}

            {success && message && (
                <Alert variant='success'>
                    <CheckCircle className='size-4' />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription><p>{message}</p></AlertDescription>
                </Alert>
            )}
            <div className="space-y-1">
                <Label htmlFor="name">Project name</Label>
                <Input name="name" id="name" />
                {errors?.name && (
                    <p className='text-xs font-medium text-red-500 dark:text-red-400'>{errors.name[0]}</p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor="description">Project description</Label>
                <Textarea name="description" id="description" />
                {errors?.description && (
                    <p className='text-xs font-medium text-red-500 dark:text-red-400'>{errors.description[0]}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className='size-4 animate-spin' /> : 'Save project'}
            </Button>
        </form>
    )
}