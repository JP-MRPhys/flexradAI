from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, RetrievalQA
from langchain.llms import Ollama  # Assuming Ollama is correctly imported

class LLM:
    def __init__(self, model_name='llama3.1') -> None:
        self.llm = Ollama(model=model_name)

        # Template for summarization
        self.template_summary = """You are an intelligent chatbot to help summarize a medical report.
        Text: {text}
        Answer:"""
        self.prompt_summary = PromptTemplate(template=self.template_summary, input_variables=["text"])
        self.summarize_chain = LLMChain(llm=self.llm, prompt=self.prompt_summary)

        # Template for keyword detection
        self.template_keywords = """You are an intelligent chatbot. Please detect key organs, technical words, and medical terms, 
        providing a summary of those words only. Do not interpret the report. Once you have the keywords, please explain each keyword. 
        Provide the output in JSON format.
        Text: {text}
        Answer:"""
        self.prompt_keywords = PromptTemplate(template=self.template_keywords, input_variables=["text"])
        self.keyword_chain = LLMChain(llm=self.llm, prompt=self.prompt_keywords)

        # Set up the chat-based QA system
        self.chatbot = self.create_vector_QA()

    def create_vector_QA(self, vector_store=None):
        """Create a retrieval-based question-answering system."""
        if vector_store is not None:
            qa_chain = RetrievalQA.from_chain_type(llm=self.llm, chain_type="chatbot", retriever=vector_store)
        else:
            qa_chain = RetrievalQA.from_chain_type(llm=self.llm, chain_type="chatbot", retriever=None)
        
        return qa_chain

    def get_QA(self, question: str):
        """Get an answer to a question based on the chat QA system."""
        return self.chatbot.invoke(question)

    def get_summary(self, text: str):
        """Get a summary of the provided text."""
        return self.summarize_chain.invoke(text)

    def get_keywords(self, text: str):
        """Extract keywords and their explanations from the provided text."""
        return self.keyword_chain.invoke(text)
    
    def chat(self, question: str):
        """Engage in a chat using the QA system."""
        return self.chatbot.invoke(question)
    
if __name__ == "__main__":

    llm = LLM(model_name='llama3.1')  # Replace with the appropriate model name from ollama
    summary = llm.get_summary("Your medical report text here.")
    keywords = llm.get_keywords("Your medical report text here.")
    answer = llm.get_QA("What are the main findings in the report?")
    response = llm.chat("Can you explain the symptoms mentioned?")

    print("Answer:", answer)
    print("Summary:", summary)
    print("Keywords:", keywords)
    print("Chat Response:", response)






