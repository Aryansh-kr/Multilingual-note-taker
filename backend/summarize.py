from langchain_community.llms import HuggingFacePipeline
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from transformers import pipeline


def summarize_text(transcript):
    try:
        # Initialize T5-small summarization pipeline
        summarizer = pipeline(
            "summarization",
            model="t5-small",
            tokenizer="t5-small",
            max_length=200,
            min_length=50,
            device=-1  # CPU
        )

        # Initialize LangChain LLM with the pipeline
        llm = HuggingFacePipeline(pipeline=summarizer)

        # Define prompt for summarization
        prompt = PromptTemplate(
            input_variables=["text"],
            template="""
            Summarize the following meeting transcript in 3-5 bullet points. 
            Include key points, decisions, and action items. Structure the output clearly.
            \n\nTranscript: {text}\n\nSummary:
            """
        )

        # Create chain and generate summary
        chain = LLMChain(llm=llm, prompt=prompt)
        summary = chain.run(text=transcript)
        return summary, None
    except Exception as e:
        return None, str(e)