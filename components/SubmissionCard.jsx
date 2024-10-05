'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  author: z.string().min(1, 'Author name is required').max(50, 'Author name must be 50 characters or less'),
  content: z.string().min(10, 'Poem must be at least 10 characters long').max(5000, 'Poem must be 5000 characters or less'),
})

export default function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      content: '',
    },
  })

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        toast({
          title: "Poem submitted successfully!",
          description: "Thank you for your contribution.",
        })
        form.reset()
      } else {
        throw new Error('Failed to submit poem')
      }
    } catch (error) {
      console.error('Error submitting poem:', error)
      toast({
        title: "An error occurred",
        description: "Failed to submit poem. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your poem's title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of your poem (max 100 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Your name or pen name" {...field} />
                </FormControl>
                <FormDescription>
                  Your name or pen name (max 50 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poem</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your poem here..." 
                    className="min-h-[200px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Your poem (10-5000 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Poem
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}