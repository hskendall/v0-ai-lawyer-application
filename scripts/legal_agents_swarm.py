import os
from swarms import Agent
from swarms.models import OpenAIChat
from swarms.structs import AgentRearrange

# Initialize the language model
model = OpenAIChat(
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    model_name="gpt-4",
    temperature=0.1,
)

# Contract Analysis Agent
contract_agent = Agent(
    agent_name="Contract-Analyzer",
    system_prompt="""You are a specialized contract analysis agent with expertise in:
    - Contract review and analysis
    - Risk assessment and identification
    - Clause interpretation and recommendations
    - Compliance verification
    - Terms and conditions evaluation
    
    Provide detailed, professional analysis with specific recommendations for contract improvements or concerns.""",
    llm=model,
    max_loops=1,
    autosave=True,
    dashboard=False,
    verbose=True,
    dynamic_temperature_enabled=True,
    saved_state_path="contract_agent.json",
    user_name="legal_user",
    retry_attempts=1,
    context_length=200000,
)

# Legal Research Agent
research_agent = Agent(
    agent_name="Legal-Researcher",
    system_prompt="""You are a specialized legal research agent with expertise in:
    - Case law research and analysis
    - Statute and regulation interpretation
    - Legal precedent identification
    - Jurisdiction-specific legal guidance
    - Citation and reference verification
    
    Provide comprehensive legal research with proper citations and relevant case law references.""",
    llm=model,
    max_loops=1,
    autosave=True,
    dashboard=False,
    verbose=True,
    dynamic_temperature_enabled=True,
    saved_state_path="research_agent.json",
    user_name="legal_user",
    retry_attempts=1,
    context_length=200000,
)

# Compliance Agent
compliance_agent = Agent(
    agent_name="Compliance-Specialist",
    system_prompt="""You are a specialized compliance agent with expertise in:
    - Regulatory compliance assessment
    - Industry-specific regulations (GDPR, HIPAA, SOX, etc.)
    - Risk management and mitigation
    - Audit preparation and documentation
    - Policy development and review
    
    Provide detailed compliance analysis with actionable recommendations for regulatory adherence.""",
    llm=model,
    max_loops=1,
    autosave=True,
    dashboard=False,
    verbose=True,
    dynamic_temperature_enabled=True,
    saved_state_path="compliance_agent.json",
    user_name="legal_user",
    retry_attempts=1,
    context_length=200000,
)

# Litigation Support Agent
litigation_agent = Agent(
    agent_name="Litigation-Support",
    system_prompt="""You are a specialized litigation support agent with expertise in:
    - Case strategy development
    - Evidence analysis and organization
    - Discovery planning and management
    - Legal brief preparation assistance
    - Settlement negotiation guidance
    
    Provide strategic litigation support with detailed analysis and actionable recommendations.""",
    llm=model,
    max_loops=1,
    autosave=True,
    dashboard=False,
    verbose=True,
    dynamic_temperature_enabled=True,
    saved_state_path="litigation_agent.json",
    user_name="legal_user",
    retry_attempts=1,
    context_length=200000,
)

# Corporate Law Agent
corporate_agent = Agent(
    agent_name="Corporate-Counsel",
    system_prompt="""You are a specialized corporate law agent with expertise in:
    - Corporate governance and structure
    - Mergers and acquisitions
    - Securities law and compliance
    - Employment law and HR policies
    - Intellectual property protection
    
    Provide comprehensive corporate legal guidance with business-focused recommendations.""",
    llm=model,
    max_loops=1,
    autosave=True,
    dashboard=False,
    verbose=True,
    dynamic_temperature_enabled=True,
    saved_state_path="corporate_agent.json",
    user_name="legal_user",
    retry_attempts=1,
    context_length=200000,
)

# Create Agent Rearrange for coordinated multi-agent responses
legal_swarm = AgentRearrange(
    name="Legal-Assistant-Swarm",
    description="A coordinated swarm of specialized legal agents",
    agents=[contract_agent, research_agent, compliance_agent, litigation_agent, corporate_agent],
    flow="Contract-Analyzer -> Legal-Researcher -> Compliance-Specialist -> Litigation-Support -> Corporate-Counsel",
    max_loops=1,
    verbose=True,
)

def run_legal_swarm(task: str, agent_type: str = "swarm"):
    """
    Run the legal swarm with a specific task
    
    Args:
        task (str): The legal task or question to process
        agent_type (str): Type of agent to use ('swarm', 'contract', 'research', 'compliance', 'litigation', 'corporate')
    
    Returns:
        str: The agent's response
    """
    
    if agent_type == "swarm":
        return legal_swarm.run(task)
    elif agent_type == "contract":
        return contract_agent.run(task)
    elif agent_type == "research":
        return research_agent.run(task)
    elif agent_type == "compliance":
        return compliance_agent.run(task)
    elif agent_type == "litigation":
        return litigation_agent.run(task)
    elif agent_type == "corporate":
        return corporate_agent.run(task)
    else:
        return "Invalid agent type specified"

# Example usage
if __name__ == "__main__":
    # Test the swarm with a sample legal question
    sample_task = "Analyze the key risks in a software licensing agreement for a SaaS company"
    
    print("🔍 Running Legal Assistant Swarm...")
    print(f"Task: {sample_task}")
    print("-" * 50)
    
    result = run_legal_swarm(sample_task, "swarm")
    print(f"Result: {result}")
