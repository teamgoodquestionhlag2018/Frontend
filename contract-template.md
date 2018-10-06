# Proposal: {{ proposal.name }}

This Freelance Contract is entered into and made effective as of {{ date.now }} , by and between:
 
{{ client.name }}, the client ("Client"),
    {{ company.address }}
 
{{ freelancer.name }}, the contractor (“Freelancer”).
 
Both parties agree as follows:
 
## Description of the Services
{{ contract.summary }}

## Milestones

{% for milestone in milestones %}
    {{ milestone.description }}
    {{ milestone.duedate}}
    {{ milestone.price }}

# Payment Terms/Schedule
At the moment of acceptance of the contract the payment of the milestone will be automatically transfered to a holding account from the Client account. When the milestone has been completed the money will be automatically transfered to the account of the Freelancer. 
 
Either party has the right to terminate this agreement after every milestone. 


## Terms and Conditions
This Freelance Contract is governed by the terms and conditions stated in the contract. 